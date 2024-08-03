import { useEffect } from 'react';

type TUseClickOutside = {
	ref: React.RefObject<HTMLDivElement>;
	callback: () => void;
};

export const useClickOutside = ({ ref, callback }: TUseClickOutside) => {
	const handleClick = (e: MouseEvent) => {
		if (e.target instanceof Node && !ref.current?.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});
};
