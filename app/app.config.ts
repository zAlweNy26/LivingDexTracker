export default defineAppConfig({
  title: 'LivingDex Tracker',
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'violet',
      secondary: 'scarlet',
      neutral: 'zinc',
    },
    icons: {
      arrowLeft: 'i-tabler-arrow-left',
      arrowRight: 'i-tabler-arrow-right',
      chevronDoubleLeft: 'i-tabler-chevrons-left',
      chevronDoubleRight: 'i-tabler-chevrons-right',
      chevronUp: 'i-tabler-chevron-up',
      chevronDown: 'i-tabler-chevron-down',
      chevronLeft: 'i-tabler-chevron-left',
      chevronRight: 'i-tabler-chevron-right',
      check: 'i-tabler-check',
      close: 'i-tabler-x',
      ellipsis: 'i-tabler-dots',
      external: 'i-tabler-arrow-up-right',
      loading: 'i-tabler-refresh',
      search: 'i-tabler-search',
      minus: 'i-tabler-minus',
      plus: 'i-tabler-plus',
      folder: 'i-tabler-folder',
      folderOpen: 'i-tabler-folder-open',
    },
    button: {
      slots: {
        base: 'cursor-pointer disabled:cursor-not-allowed transition-all',
      },
    },
    checkbox: {
      slots: {
        base: 'transition-colors',
      },
    },
    stepper: {
      slots: {
        trigger: 'cursor-pointer disabled:cursor-not-allowed disabled:bg-(--ui-bg-muted) transition-colors',
        separator: 'transition-colors',
      },
    },
    input: {
      slots: {
        base: 'transition-all',
      },
    },
    inputMenu: {
      slots: {
        base: 'transition-all',
        tagsItemDelete: 'cursor-pointer hover:bg-transparent hover:text-(--ui-error)',
      },
    },
    formField: {
      slots: {
        description: 'text-balance',
      },
    },
    slideover: {
      variants: {
        side: {
          right: {
            content: 'max-w-lg',
          },
          left: {
            content: 'max-w-lg',
          },
        },
      },
    },
    dropdownMenu: {
      slots: {
        content: 'max-h-64',
      },
    },
    select: {
      slots: {
        content: 'max-h-64 w-fit min-w-(--reka-popper-anchor-width) max-w-64',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      },
    },
    selectMenu: {
      slots: {
        content: 'max-h-64 w-fit min-w-(--reka-popper-anchor-width) max-w-64',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      },
      compoundVariants: [
        {
          leading: true,
          size: 'md',
          class: 'ps-10',
        },
        {
          trailing: true,
          size: 'md',
          class: 'pe-10',
        },
      ],
    },
    calendar: {
      slots: {
        cellTrigger: 'rounded-lg',
      },
    },
    alert: {
      slots: {
        root: 'overflow-clip',
        actions: 'gap-2',
        title: 'font-semibold',
      },
    },
    card: {
      slots: {
        header: 'p-2 sm:px-2 md:p-4',
        body: 'p-2 sm:p-2 md:p-4',
        footer: 'p-2 sm:px-2 md:p-4',
      },
    },
    modal: {
      slots: {
        overlay: 'backdrop-blur-sm',
        header: 'min-h-auto p-2 sm:px-2 md:p-4',
        body: 'p-2 sm:px-2 md:p-4',
        footer: 'p-2 sm:px-2 md:p-4',
      },
    },
  },
})
