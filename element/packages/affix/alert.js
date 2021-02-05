import { defineComponent, computed, ref } from "../../lib/vue/vue.esm-browser.js";

const TYPE_CLASSES_MAP = {
    "success": "el-icon-success",
    "warning": "el-icon-warning",
    "error": "el-icon-error"
};
export default defineComponent({
    template: `
        <transition name="el-alert-fade"> 
            <div v-show="visible" class="el-alert" :class="[typeClass, center?'is-center':'', 'is-'+effect]" role="alert">
                <i v-if="showIcon" class="el-alert__icon" :class="[iconClass,isBigIcon]"></i>
                <div class="el-alert__content">
                    <span v-if="title || $slots.title" class="el-alert__title" :class="[isBoldTitle]">
                        <slot name="title">{{ title }}</slot>
                    </span>
                    <p v-if="$slots.default || !!description" class="el-alert__description">
                        <slot name="description">{{ description }}</slot>       
                    </p>
                    <i v-if="closable" class="el-alert__closebtn" :class="{'is-customed': closeText!=='','el-icon-close': closeText===''}" @click="close">{{ closeText }}</i>
                </div>               
            </div>
        </transition>            
    `,
    props: {
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "info"
        },
        closable: {
            type: Boolean,
            default: true
        },
        closeText: {
            type: String,
            default: ""
        },
        showIcon: Boolean,
        center: Boolean,
        effect: {
            type: String,
            default: "light",
            validator: value => [ "light", "dark" ].indexOf(value) > -1
        }
    },
    emits: [ "close" ],
    setup(props, ctx) {
        const visible = ref(true);

        const typeClass = computed(() => `el-alert--${ props.type }`);
        const iconClass = computed(() => TYPE_CLASSES_MAP[props.type] || "el-icon-info");
        const isBigIcon = computed(() => props.description || ctx.$slots && ctx.$slots.default ? "is-big" : "")
        const isBoldTitle = computed(() => props.description || ctx.$slots && ctx.$slots.default ? "is-bold" : "");

        const close = evt => {
            visible.value = false;
            ctx.emits("close", evt);
        }

        return {
            visible,
            typeClass,
            iconClass,
            isBigIcon,
            isBoldTitle,
            close
        };
    }
});












































