import tw, { styled } from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`bg-gray-50 rounded-lg shadow-md p-6 flex flex-col items-center text-center`}
`;

export const Title = styled.h1`
  ${tw`text-4xl font-bold text-gray-900 mb-4`}
`;

export const Subtitle = styled.h2`
  ${tw`text-xl font-semibold text-gray-700 mb-2`}
`;

export const Text = styled.p`
  ${tw`text-gray-600 max-w-prose`}
`;

export const ImageWrapper = styled.div`
  ${tw`mt-4`}
  img {
    ${tw`w-48 h-auto`}
  }
`;

