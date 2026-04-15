const DownloadButton = ({ label = "Try now" }) => {
    const handleClickAction = () => {
        const mraid = window.mraid || {};
        if (mraid.open && typeof mraid.open === "function") {
            mraid.open();
        } else {
            window.open();
        }
    };

    return (
        <div
            className="shrink-0 px-[50px] pb-[30vh] landscape:pb-[80px] landscape:pt-0 landscape:mb-[50vh]"
            style={{ backgroundColor: "#EAF4F6" }}
        >
            <button
                onClick={handleClickAction}
                className="w-full py-[42px] rounded-full border-none font-bold text-white cursor-pointer transition-all duration-300"
                style={{
                    fontSize: "47px",
                    backgroundColor: "#4DB8C4",
                }}
            >
                {label}
            </button>
        </div>
    );
};

export default DownloadButton;
