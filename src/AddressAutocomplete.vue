<script>
import { scriptLoader } from './scriptLoader';

export default {
  mixins: [ scriptLoader ],
  props: {
    googleMapsApiKey: {
      type: String,
      default: this.googleMapsApiKey
    },
  },
  data () {
    return {
      addressAutocompleteRef: 'addressAutocompleteReference',
    };
  },
  methods: {
    loadGoogleMapsScript () {
      this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&libraries=places`)
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
