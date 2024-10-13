import { styled } from "twin.macro";

type CircularLoaderProps = {
    size?: number;
};

export const CircularLoader = styled.div<CircularLoaderProps>`
    border: ${(props) => (props.size || 120) / 8}px solid #f3f3f3;
    border-top: ${(props) => (props.size || 120) / 8}px solid #333333;
    border-radius: 50%;
    width: ${(props) => props.size || 120}px;
    height: ${(props) => props.size || 120}px;
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
