# @moodles/vue-selectbox

A useful selectbox component for vue.js

### Installation

###### webpack
`npm i --save @moodles/vue-selectbox`

###### browser
Grab `vue-selectbox.js` from `dist` folder and include it using a regular script tag

```
<script src="js/vue.js"></script>
<script src="js/vue-selectbox.js"></script>
```

### Initialization

###### webpack

```
import { SelectBox } from '@moodles/vue-selectbox';

const app = new Vue({
    el: '#app',
    components: {
        'select-box': SelectBox
    }
})
```

###### browser
```
<script src="js/vue.js"></script>
<script src="js/vue-selectbox.js"></script>

<script>
    Vue.use(VueSelectBox);

    var app = new Vue({
        el: '#app',
    });
</script>
```

### Component usage
When just using the component without any `props`, it will just show a default list of items.

```
<select-box></select-box>
```

The available `props` are:

| Prop      | Type   | Default                                        | Description                   |
| --------- | ------ | ---------------------------------------------- | ----------------------------- |
| title     | String | `Title`                                        | Title above the component     |
| data      | Array  | `[ { id: 1, email: email@example.com }, ... ]` | Dataset used in the component |
| checked   | Array  | `[]`                                           | Array of prechecked values    |
| labelKey  | String | `email`                                        | Key of property in `data` of which label you want to show per item |
| valueKey  | String | `id`                                           | Key of property in `data` of which you want to use as the value per item |
| inputName | String | `data`                                         | Name which is used as the `name` attribute on the checkboxes |


###### Example of prop usage

```
//some-vue-or-js-file
...
data() {
    return {
        employees: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Lance Bogrol' },
            { id: 3, name: 'Will Barrow' },
            { id: 4, name: 'Hanson Deck' },
            { id: 5, name: 'Desmond Eagle' },
        ],
        checkedEmployees: [2, 4, 5]
    }
}
...

...
//some-html-file
<select-box
    title="Employees"
    label-key="name"
    value-key="id"
    input-name="employees"
    :data="employees"
    :checked="checkedEmployees"
></select-box>
...
```