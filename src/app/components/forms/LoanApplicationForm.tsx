import React, { useState, useCallback } from 'react';
// Corrected the import path for zodResolver and ensured all required types are imported
import { useForm, Controller, ControllerRenderProps, FieldError } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Send, CheckCircle, Briefcase, DollarSign, Home, User, Mail, Phone } from 'lucide-react';

// --- 1. Zod Schema Definition ---

// Define the EmploymentStatus enum type explicitly for reuse
type EmploymentStatusType = "Yes" | "No";

// Define the employment status schema using refine to handle requiredness and enum constraints
const EmploymentStatus = z.enum(["Yes", "No"])
    .refine(val => val === "Yes" || val === "No", {
        message: "Please indicate your employment status (Yes/No)."
    });

const LoanApplicationSchema = z.object({
    // Step 1: Personal Info
    fullName: z.string().min(3, "Full name is required."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(10, "A valid 10-digit phone number is required."),
    address: z.string().min(5, "Your residential address is required."),

    // Step 2: Loan & Employment Details
    employed: EmploymentStatus,
    loanAmount: z.string()
        .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: "Loan amount must be a positive number."
        }),
    duration: z.string()
        .refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 1 && parseInt(val) <= 60, {
            message: "Duration must be between 1 and 60 months."
        }),
    jobTitle: z.string().optional(),

    // Step 3: Collateral Information
    collateralType: z.string().min(3, "Collateral type is required (e.g., Car, House, Stocks)."),
    collateralValue: z.string()
        .refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: "Collateral value must be a positive number."
        }),
    collateralDescription: z.string().min(10, "Please provide a brief description of the collateral."),
}).superRefine((data, ctx) => {
    // Custom refinement: If employed is "Yes", jobTitle is required
    if (data.employed === "Yes" && (!data.jobTitle || data.jobTitle.trim().length < 2)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['jobTitle'],
            message: "Job title is required if you are employed.",
        });
    }
});

// Infer the TypeScript type from the schema for strong typing throughout the component
type FormValues = z.infer<typeof LoanApplicationSchema>;
type FormField = keyof FormValues;

const STEP_TITLES = {
    1: "Personal Information",
    2: "Loan & Employment Details",
    3: "Collateral Information",
};

const stepFields = {
    1: ['fullName', 'email', 'phone', 'address'],
    2: ['employed', 'loanAmount', 'duration', 'jobTitle'],
    3: ['collateralType', 'collateralValue', 'collateralDescription'],
};

// Type for the keys of the step fields object
type StepKey = keyof typeof STEP_TITLES;

// Default values for the form (using a valid enum value 'No')
const defaultValues: FormValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    employed: 'No', 
    loanAmount: '',
    duration: '',
    collateralType: '',
    collateralValue: '',
    collateralDescription: '',
    jobTitle: '',
};

// --- 2. Typed Helper Components ---

interface CommonInputProps {
    id: FormField;
    label: React.ReactNode;
    placeholder?: string;
    type?: string;
    error?: FieldError;
}

// Input component now explicitly accepts props including those spread from Controller's field
const Input = ({ label, id, type = 'text', placeholder, error, ...rest }: CommonInputProps & ControllerRenderProps<FormValues, FormField>) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

interface RadioGroupProps {
    label: React.ReactNode;
    options: EmploymentStatusType[];
    field: ControllerRenderProps<FormValues, 'employed'>;
    error?: FieldError;
}

// RadioGroup component explicitly accepts typed props
const RadioGroup = ({ label, options, field, error }: RadioGroupProps) => (
    <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex space-x-4">
            {options.map((option: EmploymentStatusType) => (
                <label key={option} className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        value={option}
                        checked={field.value === option}
                        onChange={() => field.onChange(option)}
                        className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                </label>
            ))}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);


// --- Main Component ---
const LoanApplicationForm = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
        getValues,
        watch,
    } = useForm<FormValues>({
        resolver: zodResolver(LoanApplicationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const employedStatus = watch('employed');

    const totalSteps = Object.keys(STEP_TITLES).length;

    // Type assertion to safely access the step titles
    const stepTitle = STEP_TITLES[currentStep as StepKey];

    const handleNext = useCallback(async () => {
        // Use the defined field keys for the current step
        const fieldsToValidate = stepFields[currentStep as StepKey] as (keyof FormValues)[];

        // Ensure jobTitle is validated if needed
        if (currentStep === 2 && employedStatus === "Yes") {
            if (!fieldsToValidate.includes('jobTitle')) {
                fieldsToValidate.push('jobTitle');
            }
        }
        
        const isValid = await trigger(fieldsToValidate, { shouldFocus: true });

        if (isValid && currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, totalSteps, trigger, employedStatus]);


    const handleBack = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const onSubmit = (data: FormValues) => {
        console.log("Loan Application Data Submitted:", data);
        // Simulate API call delay
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl text-center border-t-4 border-indigo-600">
                <CheckCircle className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600">
                    Thank you, <span className="font-semibold">{getValues('fullName')}</span>. Your loan application has been successfully received. We will review your collateral details and contact you at <span className="font-semibold">{getValues('email')}</span> shortly.
                </p>
                <div className="mt-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                    >
                        Start New Application
                    </button>
                </div>
            </div>
        );
    }

    // Explicitly define the field type for the render prop (Fixes TS Error 7031)
    const RenderField = <TFieldName extends FormField>({ field, fieldName }: { field: ControllerRenderProps<FormValues, TFieldName>, fieldName: TFieldName }) => {
        const fieldError = errors[fieldName] as FieldError | undefined;
        return (
            <Input
                id={fieldName}
                label={
                    fieldName === 'fullName' ? <><User className="w-4 h-4 inline mr-1" /> Full Name</> :
                    fieldName === 'email' ? <><Mail className="w-4 h-4 inline mr-1" /> Email Address</> :
                    fieldName === 'phone' ? <><Phone className="w-4 h-4 inline mr-1" /> Phone Number</> :
                    fieldName === 'address' ? <><Home className="w-4 h-4 inline mr-1" /> Residential Address</> :
                    fieldName === 'loanAmount' ? <><DollarSign className="w-4 h-4 inline mr-1" /> Loan Amount (K)</> :
                    fieldName === 'collateralType' ? <>Collateral Type</> :
                    fieldName === 'collateralValue' ? <>Estimated Collateral Value (K)</> :
                    fieldName === 'jobTitle' ? <>Current Job Title</> :
                    fieldName === 'duration' ? <>Duration (Weeks, Max 4)</> :
                    fieldName
                }
                placeholder={
                    fieldName === 'fullName' ? 'John Daka' :
                    fieldName === 'email' ? 'john.daka@123example.com' :
                    fieldName === 'phone' ? '(+260) 775-555-555' :
                    fieldName === 'address' ? 'Kamwala South, Lusaka, Zambia' :
                    fieldName === 'loanAmount' ? 'e.g., 10000' :
                    fieldName === 'collateralType' ? 'e.g., PC, Car, House, Stocks' :
                    fieldName === 'collateralValue' ? 'e.g., 20000' :
                    fieldName === 'jobTitle' ? 'e.g., Nurse' :
                    fieldName === 'duration' ? 'e.g., 1 week' :
                    ''
                }
                type={fieldName === 'phone' || fieldName === 'loanAmount' || fieldName === 'duration' || fieldName === 'collateralValue' ? 'number' : fieldName === 'email' ? 'email' : 'text'}
                error={fieldError}
                {...field}
                // Handle number types correctly for display/reset
                value={field.value ?? ''}
            />
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8 transition-all duration-300">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
                    Chembe Fintech Solutions Loan Application
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Step {currentStep} of {totalSteps}: {stepTitle}
                </p>

                {/* Progress Bar (Inline style needed for dynamic width) */}
                <div className="mb-8">
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* --- Step 1: Personal Information --- */}
                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(['fullName', 'email', 'phone'] as (keyof FormValues)[]).map((fieldName) => (
                                <Controller
                                    key={fieldName}
                                    name={fieldName}
                                    control={control}
                                    // FIX: Explicitly type 'field' inside the render prop
                                    render={({ field }: { field: ControllerRenderProps<FormValues, typeof fieldName> }) => (
                                        <RenderField field={field} fieldName={fieldName} />
                                    )}
                                />
                            ))}
                            <div className="md:col-span-2">
                                <Controller
                                    name="address"
                                    control={control}
                                    // FIX: Explicitly type 'field' inside the render prop
                                    render={({ field }: { field: ControllerRenderProps<FormValues, 'address'> }) => (
                                        <RenderField field={field} fieldName="address" />
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* --- Step 2: Loan & Employment Details --- */}
                    {currentStep === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(['loanAmount', 'duration'] as (keyof FormValues)[]).map((fieldName) => (
                                <Controller
                                    key={fieldName}
                                    name={fieldName}
                                    control={control}
                                    // FIX: Explicitly type 'field' inside the render prop
                                    render={({ field }: { field: ControllerRenderProps<FormValues, typeof fieldName> }) => (
                                        <RenderField field={field} fieldName={fieldName} />
                                    )}
                                />
                            ))}

                            <div className="md:col-span-2">
                                <Controller
                                    name="employed"
                                    control={control}
                                    // FIX: Explicitly type 'field' inside the render prop
                                    render={({ field }: { field: ControllerRenderProps<FormValues, 'employed'> }) => (
                                        <RadioGroup
                                            label={<><Briefcase className="w-4 h-4 inline mr-1" /> Are you currently employed?</>}
                                            options={['Yes', 'No']}
                                            field={field}
                                            error={errors.employed as FieldError}
                                        />
                                    )}
                                />
                            </div>

                            {/* Conditional Field */}
                            {employedStatus === 'Yes' && (
                                <div className="md:col-span-2">
                                    <Controller
                                        name="jobTitle"
                                        control={control}
                                        // FIX: Explicitly type 'field' inside the render prop
                                        render={({ field }: { field: ControllerRenderProps<FormValues, 'jobTitle'> }) => (
                                            <RenderField field={field} fieldName="jobTitle" />
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- Step 3: Collateral Information --- */}
                    {currentStep === 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(['collateralType', 'collateralValue'] as (keyof FormValues)[]).map((fieldName) => (
                                <Controller
                                    key={fieldName}
                                    name={fieldName}
                                    control={control}
                                    // FIX: Explicitly type 'field' inside the render prop
                                    render={({ field }: { field: ControllerRenderProps<FormValues, typeof fieldName> }) => (
                                        <RenderField field={field} fieldName={fieldName} />
                                    )}
                                />
                            ))}
                            <div className="md:col-span-2">
                                <Controller
                                    name="collateralDescription"
                                    control={control}
                                    // FIX: Explicitly type 'field' inside the render prop
                                    render={({ field }: { field: ControllerRenderProps<FormValues, 'collateralDescription'> }) => (
                                        <div className="flex flex-col space-y-2">
                                            <label htmlFor="collateralDescription" className="text-sm font-medium text-gray-700">
                                                Collateral Description
                                            </label>
                                            <textarea
                                                id="collateralDescription"
                                                rows={3}
                                                placeholder="Please describe the condition and key details of your collateral."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                                {...field}
                                            />
                                            {errors.collateralDescription && (
                                                <p className="text-red-500 text-xs mt-1">{errors.collateralDescription.message}</p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* --- Navigation Buttons --- */}
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>

                        {/* Next/Submit Button */}
                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                            >
                                Next Step
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
                            </button>
                        )}
                    </div>
                    {/* Display form errors if any */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            Please correct the highlighted errors before continuing.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoanApplicationForm;
