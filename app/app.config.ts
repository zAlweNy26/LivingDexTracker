export default defineAppConfig({
    title: 'LivingDex Tracker',
    ui: {
        colors: {
            primary: 'violet' as any,
            secondary: 'scarlet' as any,
            neutral: 'stone'
        },
        icons: {
            "arrowLeft": "i-tabler-arrow-left",
            "arrowRight": "i-tabler-arrow-right",
            "chevronDoubleLeft": "i-tabler-chevrons-left",
            "chevronDoubleRight": "i-tabler-chevrons-right",
            "chevronUp": "i-tabler-chevron-up",
            "chevronDown": "i-tabler-chevron-down",
            "chevronLeft": "i-tabler-chevron-left",
            "chevronRight": "i-tabler-chevron-right",
            "check": "i-tabler-check",
            "close": "i-tabler-x",
            "ellipsis": "i-tabler-dots",
            "external": "i-tabler-arrow-up-right",
            "loading": "i-tabler-refresh",
            "search": "i-tabler-search",
            "minus": "i-tabler-minus",
            "plus": "i-tabler-plus",
        },
        button: {
            slots: {
                base: ['cursor-pointer transition-all']
            }
        },
    }
})
