const Fuchs = () => {
    return (
        <span className="text-center after:content-['\2666'] text-red-500">
            A
        </span>
    )
}

const Dulle = () => {
    return (
        <span className="text-center after:content-['\2665'] text-red-500">
            10
        </span>
    )
}

const Charlie = () => {
    return (
        <span className="text-center after:content-['\2663'] text-black">
            B
        </span>
    )
}

const Check = () => {
    return (
        <span className="text-center after:content-['\2714'] text-green-500" />
    )
}

const Fail = () => {
    return (
        <span className="text-center after:content-['\274C'] text-black" />
    )
}

const End = () => {
    return (
        <span className="text-center after:content-['\1F51A'] text-black" />
    )
}

const SpiderWeb = () => {
    return (
        <span className="text-center after:content-['\1F578'] text-white" />
    )
}

const DoubleExlamationMark = () => {
    return (
        <span className="text-center after:content-['\203C'] text-red-500" />
    )
}

const ExplodingHead = () => {
    return (
        <span className="text-center after:content-['\1F92F'] text-white" />
    )
}

const Plus = () => {
    return (
        <span className="text-center after:content-['\2795'] text-white" />
    )
}

const Minus = () => {
    return (
        <span className="text-center after:content-['\2796'] text-white" />
    )
}

interface CheckboxProps {
    isDisabled: boolean;
    isChecked: boolean;
    updateCheckbox: any;
}

const Checkbox: React.FC<CheckboxProps> = ({isDisabled, isChecked, updateCheckbox}) => {
    return (
        <input
            type="checkbox"
            checked={isChecked}
            className="form-checkbox h-3 w-3 text-blue-500 bg-gray-600 border-gray-500 rounded"
            disabled={isDisabled}
            onChange={updateCheckbox}
          />
    )
}




export { Fuchs, Dulle, Charlie, Check, Fail, End, SpiderWeb, DoubleExlamationMark, ExplodingHead, Plus, Minus, Checkbox };