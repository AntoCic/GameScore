<template>
    <div class="accordion" :id="acId">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#' + coId" aria-expanded="false" :aria-controls="coId">
                    {{ label }}
                </button>
            </h2>

            <div :id="coId" class="accordion-collapse collapse" :data-bs-parent="'#' + acId">
                <div class="accordion-body">
                    <input v-model="searchQuery" type="text" class="form-control mb-3" placeholder="Cerca…" />

                    <div v-for="option in filteredOptions" :key="'chk_' + option.value"
                        class="form-check form-switch form-check-reverse border-bottom pt-2">
                        <input class="form-check-input" type="checkbox" :id="'chk_' + option.value"
                            :checked="value.includes(option.value)" @change="toggle(option.value)" />
                        <!-- !!! usare option.value, non key -->
                        <label class="form-check-label w-100 text-start px-2" :for="'chk_' + option.value">
                            {{ option.text }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputSelectAccordion',

    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },

        /* opzionali */
        options: { type: Array, required: true }, // [{ text, value }]
        label: { type: String, default: 'Seleziona elementi' },
        id: { type: String, default: '' },
        onChange: { type: Function, required: false },
    },

    emits: ['update:modelValue'],

    data() {
        return { searchQuery: '' };
    },

    computed: {
        /* ---- value legato a modelValue[field] ---- */
        value: {
            get() {
                return this.modelValue[this.field] ?? [];
            },
            set(val) {
                this.modelValue[this.field] = val;
                const check = this.modelValue.checkField?.(this.field);
                if (this.onChange) this.onChange({ value: val, check, field: this.field });
                this.modelValue.triggerOnChange?.(val, check, this.field);
            }
        },

        /* ---- filtro: mostra sempre i selezionati ---- */
        filteredOptions() {
            const q = this.searchQuery.toLowerCase();
            return this.options.filter(
                o => o.text.toLowerCase().includes(q)
            );
        },

        acId() { return 'ac_' + this.idToSet; },
        coId() { return 'co_' + this.idToSet; },
        idToSet() { return this.id || this.field; },
    },

    methods: {
        toggle(key) {
            const newVal = this.value.includes(key)
                ? this.value.filter(k => k !== key)
                : [...this.value, key];

            /* forza il setter di value */
            this.value = newVal;
            this.$emit('update:modelValue', this.modelValue);
        },
    },

    mounted() {
        // inizializza il campo se serve (coerente con gli altri input)
        if (typeof this.modelValue.initField === 'function') {
            this.modelValue.initField(this.field, 'array', false);
        }
    },
};
</script>

<style scoped>
.accordion-body {
    max-height: 300px;
    overflow-y: auto;
}
</style>
