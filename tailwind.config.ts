import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			primary50: '#ebf2f9',
  			primary100: '#c4d8ed',
  			primary200: '#9dbfe2',
  			primary300: '#76a5d6',
  			primary400: '#4e8bca',
  			primary500: '#3572b1',
  			primary600: '#295889',
  			primary700: '#1d3f62',
  			primary800: '#12263b',
  			primary900: '#060d14',
  			secondary50: '#f7f4ed',
  			secondary100: '#e8ddca',
  			secondary200: '#d8c6a6',
  			secondary300: '#c9af83',
  			secondary400: '#b9985f',
  			secondary500: '#a07f46',
  			secondary600: '#7c6336',
  			secondary700: '#594727',
  			secondary800: '#352a17',
  			secondary900: '#352a17',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontSize: {
  			displayLarge: ["57px", "64px"],
  			displayMedium: ["45px", "52px"],
  			displaySmall: ["36px", "44px"],
  			headlineLarge: ["32px", "40px"],
  			headlineMedium: ["28px", "36px"],
  			headlineSmall: ["24px", "32px"],
  			titleLarge: ["22px", "28px"],
  			titleMedium: ["16px", "24px"],
  			titleSmall: ["14px", "20px"],
  			labelLarge: ["16px", "20px"],
  			labelMedium: ["12px", "16px"],
  			labelSmall: ["11px", "16px"],
  			bodyLarge: ["16px", "24px"],
  			bodyMedium: ["14px", "20px"],
  			bodySmall: ["12px", "16px"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
