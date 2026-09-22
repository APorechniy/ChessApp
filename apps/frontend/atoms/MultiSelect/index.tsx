import React, { useRef, useState } from 'react';
import { ChevronDown } from '../../assets/ChevronDown';
import { MultiSelectContainer, MultiSelectLabel, Select, OptionsList, Option, ChevronBlock, SelectValues, OptionText } from './styled';
import { useClickOutside } from '../../hooks/use-click-outside';

type MultiSelectProps = {
    value: any[],
    options: any[],
    optionsName?: (option: any) => string,
    handleInput: (option: any) => void,
    placeholder?: string,
    label?: string,
    isDisabled?: boolean,
    required?: boolean,
    isError?: boolean,
    errorMessage?: string,
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    value,
    handleInput,
    placeholder,
    optionsName,
    options,
    required = false,
    label,
    isError = false,
    errorMessage,
    isDisabled = false
}) => {
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const dropdownRef = useRef(null);

    const handleOpenOptions = () => {
        if (!isDisabled) setIsOpenOptions(!isOpenOptions)
    }

    const handleCheckOption = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, option: any) => {
        event.stopPropagation()
        handleInput(option)
    }

    useClickOutside(dropdownRef, () => setIsOpenOptions(false))

    const HEIGHT = label ? "7rem" : "4.5rem"

    return (
        <MultiSelectContainer height={HEIGHT} ref={dropdownRef}>
            {label && <MultiSelectLabel>{`${label} ${required ? "*" : " "}`}</MultiSelectLabel>}
            <Select
                className="select"
                isDisabled={isDisabled}
                onClick={handleOpenOptions}
            >
                <ChevronBlock $isRotate={isOpenOptions}>
                    <ChevronDown />
                </ChevronBlock>
                <SelectValues>
                    {
                        value?.length === 0
                            ?
                            placeholder
                            :
                            <>
                                {
                                    value.map((v) => (
                                        `${optionsName ? optionsName(v) : v.name}, `
                                    ))
                                }
                            </>
                    }
                </SelectValues>
                {
                    isOpenOptions &&
                    <OptionsList>
                        {
                            options.map((o) => (
                                <Option onClick={(e) => handleCheckOption(e, o)} key={o.id} title={optionsName ? optionsName(o) : o.name}>
                                    <input type='checkbox' checked={value.some((v) => v.id === o.id)} name='multi-select-option-checkbox' id={o.id} />
                                    <OptionText>
                                        {optionsName ? optionsName(o) : o.name}
                                    </OptionText>
                                </Option>
                            ))
                        }
                    </OptionsList>
                }
            </Select>
        </MultiSelectContainer>
    )
}