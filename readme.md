# Googlemaps address autocomplete (Vue.js)

### Description:
Vue.js package that helps you to seamlessly integrate the "auto suggest" and "autocomplete" feature of Google Maps' API.
Google API has developped a nice auto-suggests feature that will help users as they type an address into a form. This component is build on top of that Google feature and will thus:
- auto-suggest the available address from Google Maps
- prepopulate the address fields as the user select an address in the list

![Demo](./assets/google-maps-address-autocomplete-demo.gif)

### Usage
1. Register on the [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/places-autocomplete) to get an API key from Google and register it in your Google console.

2. npm install this package
https://www.npmjs.com/package/vue-google-maps-address-autocomplete

```bash
npm i vue-google-maps-address-autocomplete
```
OR
```bash
yarn add vue-google-maps-address-autocomplete
```
3. Define your `$googleApiKey` !

```js
// Vue 2
Vue.prototype.$googleMapsApiKey = 'yourApiKey';

// Vue 3
Vue.config.globalProperties.$googleMapsApiKey = 'yourApiKey';
```

4. In your Vue project, globally or locally register this component.

**Globally in main.js**
```js
import AddressAutocomplete from 'vue-google-maps-address-autocomplete';
Vue.use(AddressAutocomplete);
```

**Locally in a component.vue**
```js
import AddressAutocomplete from 'vue-google-maps-address-autocomplete';
export default {
  ...,
  components: { addressAutocomplete },
  ...
};
```

5. Component interface:
The feature is implemented through a wrapper component: `<address-autocomplete>slot</address-autocomplete>`.
The component will expose a `slot` giving you the possibility to structure and style your component anyway you want. This package **does not provide any design implementation** as this is purely a **renderless component** that will just provide some JS logic to implement the autosuggest & autocomplete functionalities.

_Example of usage_
```vue
<template>
  <address-autocomplete
    v-slot="{ addressAutocompleteRef, loadGoogleMapsScript }"
    @updateAddress="populateAutocompletedAddress"
  >
    // Here comes your code
    <div>
      <input
        v-model="address.streetName"
        :ref="addressAutocompleteRef"
        @input.once="loadGoogleMapsScript"
      >
      <input v-model="address.streetNumber">
      <input v-model="address.streetBox">
      <input v-model="address.zipCode">
      <input v-model="address.city">
    </div>
  </address-autocomplete>
</template>

<script>
  export default {
    data () {
      return {
        address: { streetName, streetNumber, zipCode, city }
      }
    },
    ...,
    methods: {
      populateAutocompletedAddress (autocompletedAddress) {
        // Here you assign the autocompletedAddress to your address data.
        this.address = { ...this.address, ...autocompletedAddress };
      }
    }
  }
</script>
```

#### Properties & Events
**Ref**
___
It exposes the `addressAutocompleteRef` attribute. This attribute is **required** on your "auto suggest" input with a `:ref` binding. This is the input where the client will start typing and the suggestions from GoogleMaps will show up.
```html
<input v-model="address.streetName" :ref="addressAutocompleteRef">
```
**Props**
___
This provides the option to restrict the suggestions to specific countries. Props must be passed as a two-character, ISO 3166-1 Alpha-2 compatible country code (i.e. "br", "sg", "fr") in an array.
- props: `countryRestrictions`
- Default is: ["be"]
- Type: `Array`
```html
<input v-model="address.streetName" :country-restrictions="['au', 'nz']">
```

**Methods**
___
Exposes a `loadGoogleMapsScript` method to asynchronously load the GoogleMaps script. This way, you're in control of when the script is actually loaded (ie: when user touches the input or @mounted).
```html
<input v-model="address.streetName" @input.once="loadGoogleMapsScript">
```

**Hook**
___
- It exposes the `@updateAddress` hook that is triggered when the user select an option in the available list, passing the `autocompletedAddress`. This will prepopulated the address fields:
  - `streetName`
  - `streetNumber`
  - `zipCode`
  - `city`

```js
methods: {
  populateAutocompletedAddress (autocompletedAddress) {
    this.address = { ...this.address, ...autocompletedAddress };
  }
}
```

___

Use with care and enjoy 😉
