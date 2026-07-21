// Shared Tailwind CSS configuration for the SETU design system
tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed-dim": "#d98aa3",
                    "on-secondary-container": "#6b2c0f",
                    "surface-bright": "#f5efe1",
                    "primary-fixed": "#bcd4c9",
                    "on-surface": "#211c16",
                    "tertiary-container": "#6e1530",
                    "outline-variant": "#cdbb95",
                    "surface": "#f5efe1",
                    "surface-container-high": "#ddcfac",
                    "primary-container": "#14463c",
                    "surface-container": "#e6dac0",
                    "on-tertiary-fixed": "#2c0815",
                    "inverse-primary": "#7faa97",
                    "error-container": "#ffdad6",
                    "tertiary-fixed": "#f0c9d4",
                    "error": "#ba1a1a",
                    "inverse-surface": "#2a2419",
                    "primary-fixed-dim": "#7faa97",
                    "background": "#f5efe1",
                    "on-secondary-fixed-variant": "#7a3a14",
                    "on-surface-variant": "#5c5347",
                    "on-tertiary": "#ffffff",
                    "tertiary": "#4a0f23",
                    "on-primary-fixed": "#0e231f",
                    "surface-tint": "#3c6c5c",
                    "on-primary-container": "#6fa392",
                    "on-primary-fixed-variant": "#2f5249",
                    "on-tertiary-container": "#c45a7e",
                    "secondary-fixed-dim": "#e8a456",
                    "surface-container-lowest": "#ffffff",
                    "secondary": "#c1531f",
                    "surface-container-low": "#ede4cf",
                    "on-background": "#211c16",
                    "primary": "#1b3a34",
                    "surface-dim": "#d9cbac",
                    "on-tertiary-fixed-variant": "#7a2440",
                    "on-error-container": "#93000a",
                    "on-error": "#ffffff",
                    "secondary-fixed": "#f6d9b0",
                    "outline": "#8a7c64",
                    "on-secondary-fixed": "#3a1c08",
                    "secondary-container": "#e8932f",
                    "on-secondary": "#ffffff",
                    "on-primary": "#ffffff",
                    "inverse-on-surface": "#f3ead4",
                    "surface-variant": "#dccdab",
                    "surface-container-highest": "#dccdab"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "container-max": "1280px",
                    "margin-mobile": "16px",
                    "gutter": "24px",
                    "unit": "8px",
                    "margin-desktop": "48px"
            },
            "fontFamily": {
                    "label-caps": ["Space Mono"],
                    "caption": ["Inter"],
                    "headline-lg": ["Fraunces"],
                    "display": ["Fraunces"],
                    "body-lg": ["Inter"],
                    "body-md": ["Inter"],
                    "headline-lg-mobile": ["Fraunces"],
                    "headline-md": ["Inter"]
            },
            "fontSize": {
                    "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "500"}],
                    "caption": ["12px", {"lineHeight": "16px", "fontWeight": "400"}],
                    "headline-lg": ["40px", {"lineHeight": "46px", "fontWeight": "600"}],
                    "display": ["68px", {"lineHeight": "70px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-md": ["20px", {"lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600"}]
            }
          }
        }
      }