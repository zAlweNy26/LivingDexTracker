export default defineAppConfig({
    title: 'LivingDex Tracker',
    ui: {
        colors: {
            primary: 'violet' as any,
            secondary: 'scarlet' as any,
            neutral: 'stone'
        },
        button: {
            slots: {
                base: ['cursor-pointer transition-all']
            }
        }
    }
})
