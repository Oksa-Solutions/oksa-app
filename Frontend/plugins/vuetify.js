import OksaIconGradientFill from '~/components/icons/OksaIconGradientFill.vue';
import OksaIconMini from '~/components/icons/OksaIconMini.vue';
import OksaIconNoFill from '~/components/icons/OksaIconNoFill.vue';
import OksaIconNoReflection from '~/components/icons/OksaIconNoReflection.vue';
import OksaIconAndText from '~/components/icons/OksaIconAndText.vue';
import OksaText from '~/components/icons/OksaText.vue';
import OksaCelebration from '~/components/icons/OksaCelebration.vue';
import OksaCelebrationBig from '~/components/icons/OksaCelebrationBig.vue';

import colors from 'vuetify/es5/util/colors';

export default {
  // Exporting the icons
  // Use with <v-icon class="black--text">$vuetify.icons.oksa</v-icon>
  icons: {
    values: {
      oksa: {
        // Alias
        component: OksaIconMini,
      },
      'oksa-mini': {
        component: OksaIconMini,
      },
      'oksa-gradient': {
        component: OksaIconGradientFill,
      },
      'oksa-nofill': {
        component: OksaIconNoFill,
      },
      'oksa-noreflection': {
        component: OksaIconNoReflection,
      },
      'oksa-iconandtext': {
        component: OksaIconAndText,
      },
      'oksa-text': {
        component: OksaText,
      },
      'oksa-celebration': {
        component: OksaCelebration,
      },
      'oksa-celebration-big': {
        component: OksaCelebrationBig,
      },
    },
  },
  theme: {
    options: {customProperties: true},
    dark: false,
    themes: {
      light: {
        // To use the lighten/darken modificators: color="yellow darken-3"
        // CSS variable: var(--v-ColorName-Modifier--Variant)
        // See https://vuetifyjs.com/en/styles/colors/

        ////////////////
        // MAIN
        primary: {
          // Same as darkBlue
          // Origin: colors.blue.darken2
          base: '#3600B3',
        },
        secondary: {
          // Same as yellow
          // Origin: colors.grey.darken1
          base: '#F9BB22',
          lighten3: '#FAC238',
          darken3: '#C7961B',
        },
        accent: {
          base: colors.shades.black,
          darken3: '#80868A',
        },

        ////////////////
        // GRADIENTS
        ////////////////

        // FUNCTION
        background: {
          base: '#f0f0f1',
        },
        error: {
          base: '#B30021',
        },
        wait: {
          base: '#EE9300',
        },
        archived: {
          base: '#1E63FD',
        },
        ok: {
          base: '#6ABC4B',
        },
        realWhite: {
          base: '#ffffff',
        },
        realBlack: {
          base: '#000000',
        },
        cardBorder: {
          base: '#b7b7b7',
        },

        ////////////////
        // IDENTITY COLORS
        darkBlue: {
          base: '#3600B3',
        },
        jorisViolet: {
          base: '#6A00FF',
        },
        yellow: {
          base: '#F9BB22',
          lighten3: '#FAC238',
          darken3: '#C7961B',
        },
        carrot: {
          base: '#FF7B3D',
          lighten3: '#FF8850',
          darken3: '#CC6231',
        },
        rose: {
          base: '#F4619B',
          lighten3: '#F571A5',
          darken3: '#C34E7C',
        },
        lavender: {
          base: '#BA7AFF',
          lighten3: '#C187FF',
          darken3: '#9562CC',
        },
        cornflower: {
          base: '#808CFF',
          lighten3: '#8D97FF',
          darken3: '#6670CC',
        },
        skyblue: {
          base: '#74BCFF',
          lighten3: '#82C3FF',
          darken3: '#5D96CC',
        },
        turquoise: {
          base: '#42C7A6',
          lighten3: '#55CDAF',
          darken3: '#359F85',
        },
        lime: {
          base: '#9DC054',
          lighten3: '#A7C665',
          darken3: '#7E9A43',
        },
        darkGray: {
          base: '#252220',
          lighten3: '#80868A',
        },
      },

      dark: {
        ////////////////
        // MAIN
        primary: {
          // Same as darkBlue
          // Origin: colors.blue.darken2
          base: '#6A00FF', // Same as JorisPurple
        },
        secondary: {
          // Same as yellow
          // Origin: colors.grey.darken1
          base: '#C7961B',
          lighten3: '#FAC238',
          darken3: '#C7961B',
        },
        accent: colors.grey.darken3,

        ////////////////
        // GRADIENTS

        ////////////////
        // FUNCTION
        background: {
          base: '#121212',
        },
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        success: colors.green.accent3,
        error: {
          base: '#B30021',
        },
        wait: {
          base: '#EE9300',
        },
        archived: {
          base: '#1E63FD',
        },
        ok: {
          base: '#6ABC4B',
        },
        realWhite: {
          base: '#1e1e1e',
        },
        realBlack: {
          base: '#ffffff',
        },
        cardBorder: {
          base: '#b7b7b7',
        },

        ////////////////
        // IDENTITY
        darkBlue: {
          base: '#3600B3',
        },
        jorisViolet: {
          base: '#6A00FF',
        },
        yellow: {
          base: '#F9BB22',
          lighten3: '#FAC238',
          darken3: '#C7961B',
        },
        carrot: {
          base: '#FF7B3D',
          lighten3: '#FF8850',
          darken3: '#CC6231',
        },
        rose: {
          base: '#F4619B',
          lighten3: '#F571A5',
          darken3: '#C34E7C',
        },
        lavender: {
          base: '#BA7AFF',
          lighten3: '#C187FF',
          darken3: '#9562CC',
        },
        cornflower: {
          base: '#808CFF',
          lighten3: '#8D97FF',
          darken3: '#6670CC',
        },
        skyblue: {
          base: '#74BCFF',
          lighten3: '#82C3FF',
          darken3: '#5D96CC',
        },
        turquoise: {
          base: '#42C7A6',
          lighten3: '#55CDAF',
          darken3: '#359F85',
        },
        lime: {
          base: '#9DC054',
          lighten3: '#A7C665',
          darken3: '#7E9A43',
        },
      },
    },
  },
};
