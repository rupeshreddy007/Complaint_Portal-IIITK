const DetailsCard = ({title, content, isLoading}) => {
    // console.log(isLoading, title, content);
    return (
        <div className='rounded-lg flex flex-col justify-center items-center bg-white  p-10 shadow-lg'
            style={{
                width: 'minmax(fit-content, 16.666667%;)'
            }}
        >
            {
                isLoading ? <div className='animate-pulse w-20 h-20 bg-gray-200 rounded-full'></div> :
                    <>
                        <h1 className='text-2xl font-bold'>{title}</h1>
                        <p className='text-lg font-semibold'>{content}</p>
                    </>
            }
        </div>
    );
}

export default DetailsCard;