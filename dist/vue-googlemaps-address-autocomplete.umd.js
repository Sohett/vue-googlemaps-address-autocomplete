(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vueGooglemapsAddressAutocomplete = factory());
}(this, (function () { 'use strict';

  var script = {
    data () {
      return {
        addressAutocompleteRef: 'addressAutocompleteReference',
      };
    },
    methods: {
      loadScript (src, id = null) {
        return new Promise(function (resolve, reject) {
          if (document.querySelector('script[src="' + src + '"]')) {
            resolve();

            return;
          }

          const el = document.createElement('script');

          el.type = 'text/javascript';
          el.async = true;
          el.src = src;
          el.id = id;

          el.addEventListener('load', resolve);
          el.addEventListener('error', reject);
          el.addEventListener('abort', reject);

          document.head.appendChild(el);
        });
      },
      loadGoogleMapsScript () {
        this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.$googleMapsApiKey}&libraries=places`)
        .then(() => {
          this.initializeAddressAutocomplete();
        });
      },
      initializeAddressAutocomplete () {
        const inputElement = this.$scopedSlots.default()[0].context.$refs[this.addressAutocompleteRef];

        this.autocomplete = new google.maps.places.Autocomplete(
          inputElement,
          { types: ['geocode'] },
        );

        this.autocomplete.setComponentRestrictions({ country: ['be'] });

        this.autocomplete.addListener('place_changed', () => {
          const place = this.autocomplete.getPlace();
          const ac = place.address_components;

          const {
            route: streetName,
            street_number: streetNumber = null,
            postal_code: zipCode = null,
            locality: city = null,
          } = ac.reduce(function (map, obj) {
            map[obj.types[0]] = obj.short_name;
            return map;
          }, {});

          this.$emit('udpateAddress', { streetName, streetNumber, zipCode, city });
        });
      },
    },
    render () {
      return this.$scopedSlots.default({
        loadGoogleMapsScript: this.loadGoogleMapsScript,
        addressAutocompleteRef: this.addressAutocompleteRef,
      });
    },
  };

  script.__file = "src/AddressAutocomplete.vue";

  // Import vue component

  // install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('AddressAutocomplete', script);
  }
  // Create module definition for Vue.use()
  const plugin = {
    install,
  };

  // To auto-install when vue is found
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  // Inject install function into component - allows component
  // to be registered via Vue.use() as well as Vue.component()
  script.install = install;

  return script;

})));
