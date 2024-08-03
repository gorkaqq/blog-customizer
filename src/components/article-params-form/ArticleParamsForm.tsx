import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';
import { useClickOutside } from 'src/hooks/useClickOutside';

type ArticleParamsFormProps = {
	setArticleState: (states: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedWidth, setSelectedWidth] = useState(
		defaultArticleState.contentWidth
	);
	const rootRef = useRef<HTMLDivElement>(null);

	useClickOutside({
		ref: rootRef,
		callback: () => {
			setIsOpen(false);
		},
	});

	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const formResetHandler = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedWidth(defaultArticleState.contentWidth);
		setArticleState(defaultArticleState);
	};

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();

		setArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedWidth,
		});

		setIsOpen(false);
	};
	return (
		<>
			<ArrowButton onClick={handleToggleOpen} isOpen={isOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={formSubmitHandler}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={setSelectedFont}></Select>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
						name={'FontSize'}></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}></Select>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectedWidth}
						onChange={setSelectedWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formResetHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
