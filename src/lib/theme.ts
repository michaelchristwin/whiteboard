import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

function getInitial(): Theme {
	if (!browser) return 'system';
	return (localStorage.getItem('theme') as Theme) ?? 'system';
}

export const theme = writable<Theme>(getInitial());

function applyTheme(value: Theme) {
	if (!browser) return;

	const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
	const resolved = value === 'dark' ? true : value === 'light' ? false : systemDark;

	document.documentElement.classList.toggle('dark', resolved);

	if (value === 'system') {
		localStorage.removeItem('theme');
	} else {
		localStorage.setItem('theme', value);
	}
}

theme.subscribe(applyTheme);
