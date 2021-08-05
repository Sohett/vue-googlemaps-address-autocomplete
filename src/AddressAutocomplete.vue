<script>
export default {
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
</script>
