<template>
    <div class="select-box-criteria">
        <div class="select-box-criteria-title">
            <div class="is-size-5 is-primary-title">
                {{ title }}
            </div>
        </div>

        <div class="select-box-selected-helper">
            <button
                type="button"
                class="button is-small is-white"
                :disabled="selectedData.length == data.length"
                @click="selectAll()"
            >
                <span class="icon">
                    <i class="fa fa-check-circle-o"></i>
                </span>
                <span>
                    Alles selecteren
                </span>
            </button>
            <button
                type="button"
                class="button is-small is-white"
                :disabled="selectedData.length == 0"
                @click="resetFilters()"
            >
                <span class="icon">
                    <i class="fa fa-times-circle-o"></i>
                </span>
                <span>
                    {{ selectedData.length }} selectie(s) ongedaan maken
                </span>
            </button>
        </div>

        <div class="select-box-criteria-search-box">
            <div class="field">
                <div class="control">
                    <input
                        type="text"
                        class="input"
                        placeholder="Zoeken"
                        v-model="searchQuery"
                    >
                </div>
            </div>
        </div>

        <div
            class="select-box-criteria-box"
            :class="{ 'is-empty': !filteredData.length }"
        >
            <label
                class="select-box-criteria-box-item"
                v-for="data in data"
                :key="data[valueKey]"
                :class="{ 'is-selected': selectedData.indexOf(data[valueKey]) > -1 }"
                v-show="isInFilter(data[valueKey])"
            >
                <input
                    type="checkbox"
                    :name="`${inputName}[]`"
                    :value="data[valueKey]"
                    v-model="selectedData"
                    @change="emitChanges(); emitData($event, data)"
                >
                <span :title="data[labelKey]">
                    {{ data[labelKey] }}
                </span>
            </label>

            <div
                class="select-box-criteria-box-empty"
                v-if="!filteredData.length"
            >
                <i class="fa fa-exclamation"></i>
                <p class="is-size-7">
                    Geen resultaten
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'select-box',
        props: {
            title: {
                type: String,
                default: 'Title'
            },
            data: {
                type: Array,
                default: () => [
                    { id: 1, email: 'email@example.com' },
                    { id: 2, email: 'firstname@example.com' },
                    { id: 3, email: 'lastname@example.com' },
                    { id: 4, email: 'test@example.com' },
                    { id: 5, email: 'vue@example.com' },
                ]
            },
            checked: {
                type: [Array, Boolean],
                default: () => []
            },
            labelKey: {
                type: String,
                default: 'email'
            },
            valueKey: {
                type: String,
                default: 'id'
            },
            inputName: {
                type: String,
                default: 'data'
            }
        },
        data() {
            return {
                searchQuery: '',
                selectedData: (this.checked) ? this.checked : []
            }
        },
        computed: {
            filteredData() {
                return this.data.filter(data => {
                    return data[this.labelKey]
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase());
                });
            }
        },
        watch: {
            checked(val) {
                if (val) {
                    this.selectedData = val
                }
            }
        },
        methods: {
            resetFilters() {
                this.selectedData = [];

                this.emitChanges();
            },
            selectAll() {
                this.selectedData = [];

                this.data.forEach(item => {
                    this.selectedData.push(item[this.valueKey]);
                });

                this.emitChanges();
            },
            emitChanges() {
                this.$emit('input', this.selectedData);
            },
            emitData(event, data) {
                if (event.target.checked) {
                    this.$emit('data-change', data)
                }
            },
            isInFilter(valueKey) {
                const found = this.filteredData.find(item => item[this.valueKey] == valueKey);

                if (!found) {
                    return false;
                }

                return true;
            }
        }
    }
</script>

<style lang="scss">
    .select-box-criteria {

        .select-box-criteria-box {
            border: 1px solid #dbdbdb;
            min-height: 300px;
            max-height: 300px;
            overflow: auto;

            &.is-empty {
                display: flex;
                flex-direction: column;
            }

            .select-box-criteria-box-item {
                display: block;
                padding: 5px;
                border-bottom: 1px solid #dbdbdb;
                cursor: pointer;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: .9rem;

                &:hover {
                    background: #f5f5f5;
                }

                &.is-selected {
                    background: darken(#f5f5f5, 5%);
                }
            }
        }

        .select-box-criteria-box-empty {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;

            i {
                font-size: 2.5em;
            }
        }

        .select-box-criteria-search-box,
        .select-box-selected-helper {
            margin: 0 0 10px;
        }
    }
</style>