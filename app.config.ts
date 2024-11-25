export default defineAppConfig({
    title: 'LivingDex Tracker',
    ui: {
        colors: {
            primary: 'violet' as any,
            secondary: 'scarlet' as any,
            neutral: 'stone'
        },
        icons: {
            close: 'i-tabler-x'
        },
        button: {
            slots: {
                base: ['cursor-pointer transition-all']
            }
        },
    }
})
