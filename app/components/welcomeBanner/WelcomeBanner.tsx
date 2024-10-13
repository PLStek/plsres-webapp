"use client";

import React from "react";
import Image from "next/image";
import {
    Subtitle,
    Title,
    Wrapper,
    Text,
    ImageWrapper,
} from "./WelcomeBanner.styles";

const WelcomeBanner = () => {
    return (
        <Wrapper>
            <Title>Bienvenue dans la mine du PL$tek</Title>
            <Subtitle>Notre mission ? T’aider à réussir tes UE !</Subtitle>
            <Text>
                L’équipe du PL$tek est ravie de t’accueillir sur son nouveau
                site: la mine !<br />
                Ici, tu retrouveras tous nos charbons, accompagnés de leurs
                rediffusions et de leurs ressources, telles que les corrections
                et les notes des actionneurs.
            </Text>
            <ImageWrapper>
                <Image src={"../../../public/images/charbon.svg"} alt={"Test"} width={200} height={200}/>
            </ImageWrapper>
        </Wrapper>
    );
};

export default WelcomeBanner;
