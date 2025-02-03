const InputCard = ({typeInput, name, LabelName, placeholder, styles, disabled, value, required, accept, props}) => {
    let size = value ? value.length : null;
    size = placeholder ? placeholder.length:size;
    size = props && props.size ? props.size : size;
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={name} className='text-base font-semibold'>{LabelName} {required &&
            <span className='text-red-600'>*</span>}</label>
        <input {...props} type={typeInput} name={name} placeholder={placeholder} required={required} value={value} accept={accept} disabled={disabled}  className={`px-4 py-2 text-base border border-gray-400 rounded shadow focus:outline-2 hover:outline-2 hover:outline-blue-300 focus:outline-blue-600  focus:border- ${styles}`} size={size} />
    </div>
  )
}

export default InputCard