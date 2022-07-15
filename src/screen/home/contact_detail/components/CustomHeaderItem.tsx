import React from 'react'
import Avatar from "@/screen/components/Avatar";

const CustomHeaderItem = () => {
    return (
        <WrapHeaderItem>
            <Avatar source={item?.avatar} />
    <WrapTitleHeader>
    <CustomTitleHeaderItem>{item?.value ?? ''}</CustomTitleHeaderItem>
    <CustomSubTitleHeaderItem>UI/UX Design</CustomSubTitleHeaderItem>
    </WrapTitleHeader>
    <WrapButtonContainer>
    {buttonList.map((button, index) => (
            <CustomButton key={index} {...button} />
))}
    </WrapButtonContainer>
    </WrapHeaderItem>
    )
}
