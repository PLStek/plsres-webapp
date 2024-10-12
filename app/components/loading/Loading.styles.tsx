import tw, { styled }    from "twin.macro";

export const CircularLoader = styled.div`
    ${tw`border-4 border-solid border-gray-300`}
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
