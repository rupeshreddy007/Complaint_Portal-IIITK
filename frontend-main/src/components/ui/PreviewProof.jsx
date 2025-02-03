const firstRow = "text-base font-medium text-gray-600";
const secondRow = "font-bold text-xl";
const row = "flex flex-col gap-1";
const col = "flex flex-col gap-5"


const PreviewProof = ({ attachmentUrl }) => {
    if(!attachmentUrl) return null;
    return (
        <>
            <div className={`${firstRow} text-5xl`}>
                Proof
            </div>
            <div className={`${secondRow} rounded-md text-blue-700 `}>
                {attachmentUrl && (
                    <>
                        {attachmentUrl.endsWith('.mp4') ? (
                            <video controls>
                                <source src={attachmentUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : attachmentUrl.endsWith('.png') || attachmentUrl.endsWith('.jpg') || attachmentUrl.endsWith('.jpeg') ? (
                            <img src={attachmentUrl} alt="Attachment"/>
                        ) : (
                            <a href={attachmentUrl} download>Download Attachment</a>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default PreviewProof;
