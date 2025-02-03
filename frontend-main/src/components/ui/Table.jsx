const Table = ({title, query, Component}) => {
    const {data} = query;
    const flattenedData = data.pages.flat().map((technician) => technician);

    return (
        <div className='flex flex-col' style={{
            width: '48%',
            height: '100%',
        }}>
            <div>{title}</div>
            <div className='flex flex-col shadow-lg overflow-y-scroll'
            >
                {flattenedData.map((item, index) => <Component key={index} {...item} />)}
            </div>
        </div>
    );
}

export default Table;