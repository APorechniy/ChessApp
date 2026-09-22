import React, { useRef, useState } from 'react';
import { ChevronBlock, Option, OptionsBlock, OptionText, Select, SelectContainer, SelectLabel, SelectValue } from './styled';
import { ChevronDown } from '../../assets/ChevronDown';
import { useClickOutside } from '../../hooks/use-click-outside';

type ListOption = {
    value: string,
    text: string,
}

type BaseInputProps = {
    value: string | string[],
    options: ListOption[],
    handleSelect: (option: ListOption) => void,
    style?: React.CSSProperties,
    placeholder?: string,
    label?: string,
    isDisabled?: boolean,
    required?: boolean,
}

export const BaseSelect: React.FC<BaseInputProps> = ({
    value,
    handleSelect,
    placeholder,
    options,
    required = false,
    label,
    isDisabled = false,
    style = {}
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null);

    const handleOpen = (event) => {
        event.stopPropagation();
        if (isDisabled) {
            setIsOpen(false)
        } else {
            setIsOpen(!isOpen)
        }
    }

    useClickOutside(dropdownRef, () => setIsOpen(false))

    const onSelectOption = (value: string) => {
        const opt = options.find(o => o.value === value)

        handleSelect(opt);
    }

    const currentValue = value ? options?.find(o => o.value === value)?.text : placeholder

    const HEIGHT = label ? "7rem" : "4.5rem"

    return (
        <SelectContainer $height={HEIGHT} ref={dropdownRef}>
            {label && <SelectLabel>{`${label} ${required ? "*" : " "}`}</SelectLabel>}
            <Select
                onClick={handleOpen}
                $isActive={isOpen}
                className="select"
                role={'select'}
                style={style}
                $isDisabled={isDisabled}
            >
                <ChevronBlock $isRotate={isOpen}>
                    <ChevronDown />
                </ChevronBlock>
                <SelectValue title={currentValue}>
                    {currentValue}
                </SelectValue>
                {
                    (isOpen && !isDisabled) &&
                    <OptionsBlock>
                        {
                            options?.map(({ value: val, text }) => (
                                <Option
                                    key={JSON.stringify(val)}
                                    onClick={() => onSelectOption(val)}
                                >
                                    <OptionText>
                                        {text}
                                    </OptionText>
                                </Option>
                            ))
                        }
                    </OptionsBlock>
                }
            </Select>
        </SelectContainer>
    )
}