<template>
    <label v-if="label || label === ''" :for="idToSet"
        :class="labelClass ?? 'form-label mb-1'" :style="labelStyle">
        <template v-if="label === true || label === ''"> {{ idToSet }} </template>
        <span v-else v-html="label"></span>
        <span v-if="required" class="text-danger">*</span>
    </label>
    <input ref="inputRef" type="range" :value="value" @input="handleInput" @change="handleChange"
        :class="[classValidator, `form-range ${$attrs.class ?? ''}`]" :style="$attrs.style" :id="idToSet" :name="idToSet"
        data-bs-toggle="tooltip" data-bs-custom-class="bg-danger" :data-bs-title="errorDefaultText"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :required="required" :autofocus="autofocus"
        :max="maxToSet" :min="minToSet" :step="step" :list="isList">
    <datalist v-if="isList" :id="isList">
        <option v-for="option in list" :key="option" :value="option"></option>
    </datalist>
</template>

<script>
import { Tooltip } from 'bootstrap';
export default {
    name: 'InputRadio',
    props: {
        field: { type: String, required: true },
        modelValue: { type: Object, required: true },
        lazy: { type: Boolean, default: false },
        validation: { type: Object, default: {} },
        errorContent: { type: String, required: false },
        onChange: { type: Function, required: false },
        id: { type: String, required: false },
        label: { type: [String, Boolean], required: false },
        labelClass: { type: String, required: false },
        labelStyle: { type: String, required: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        autofocus: { type: Boolean, default: false },
        max: { type: Number, required: false },
        min: { type: Number, required: false },
        step: { type: Number, required: false },
        placeholder: { type: String, required: false },
        list: { type: Array, default: () => [] },
    },
    data() {
        return { lazyTimer: null, };
    },
    methods: {
        handleInput(event) {
            if (this.lazy) {
                if (this.lazyTimer) {
                    clearTimeout(this.lazyTimer);
                    this.lazyTimer = null;
                };
                this.lazyTimer = setTimeout(() => {
                    this.value = event.target.value;
                }, 300);
            } else {
                this.value = event.target.value;
            }
        },
        handleChange(event) {
            if (this.lazy && this.lazyTimer) {
                clearTimeout(this.lazyTimer);
                this.lazyTimer = null;
                this.value = event.target.value;
            }
        }
    },
    computed: {
        value: {
            get() {
                return this.modelValue[this.field];
            },
            set(value) {
                this.modelValue[this.field] = value;
                const check = this.modelValue.checkField(this.field);
                if (this.onChange) { this.onChange({ value, check, field: this.field }); };
                this.modelValue.triggerOnChange(value, check, this.field);
            }
        },
        idToSet() {
            return this.id ?? this.field
        },
        minToSet() {
            return this.min ?? (this.validation?.min ?? false);
        },
        maxToSet() {
            return this.max ?? (this.validation?.max ?? false);
        },
        isList() {
            return this.list.length ? `list-${this.idToSet}` : null
        },
        errorDefaultText() {
            return this.errorContent ? this.errorContent : `Il valore deve essere tra ${this.validation?.min !== undefined ? this.validation.min : '0'} a ${this.validation?.max !== undefined ? this.validation.max : '255'}.`
        },
        classValidator() {
            const classValidator = this.modelValue.classValidator(this.field);
            if (!this.tooltips) return classValidator
            switch (classValidator) {
                case '':
                case 'is-valid':
                    this.tooltips.disable();
                    this.tooltips.hide();
                    break;
                default:
                    this.tooltips._isHovered = null;
                    this.tooltips.enable();
                    this.tooltips.show();
                    break;
            }
            return classValidator
        },
    },
    mounted() {
        let validation = this.validation
        if (this.minToSet) validation = { min: this.minToSet, ...validation };
        if (this.maxToSet) validation = { max: this.maxToSet, ...validation };
        this.modelValue.initField(this.field, 'number', this.required ? validation : false);
        this.tooltips = new Tooltip(this.$refs.inputRef);
        this.tooltips.disable();
    },
    unmounted() {
        if (this.tooltips) { this.tooltips.dispose(); }
    }
};
</script>

<style lang="scss" scoped></style>
