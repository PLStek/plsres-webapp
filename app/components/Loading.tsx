const Loading = ({ size = 10 }: { size: number }) => {
    const borderSize = size / 8;

    return (
        <div
            className={`border-t-4 border-gray-800 border-solid rounded-full animate-spin`}
            style={{
                borderWidth: borderSize,
                width: size,
                height: size,
                borderTopWidth: borderSize,
                borderColor: "#f3f3f3",
                borderTopColor: "#333333",
            }}
        ></div>
    );
};
export default Loading;
