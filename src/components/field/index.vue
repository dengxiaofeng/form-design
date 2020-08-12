<template>
  <div class="ve-field ve-inline-field" :class="className">
    <div class="ve-field-head">
      <a class="ve-field-title">
        <b v-for="(item, index) in title" :key="index" class="ve-word">{{ item }}</b>
      </a>
    </div>
    <div class="ve-field-body">
      <slot />
    </div>
    <div class="ve-field-foot">
      <div v-if="variable" class="field-variable-wrapper">
        <div>
          <el-tooltip effect="dark" content="绑定变量" placement="top">
            <i class="icon-tip field-variable-switcher ">
              <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" width="24px" height="24px" viewBox="0 0 1024 1024" class="ve-svgicon" style="vertical-align: middle;"><path d="M596.32 263.392c18.048 6.56 27.328 26.496 20.8 44.512l-151.04 414.912a34.72 34.72 0 1 1-65.28-23.744l151.04-414.912a34.72 34.72 0 0 1 44.48-20.768zM220.64 192H273.6v55.488H233.024c-26.112 0-38.464 14.4-38.464 44.544v134.304c0 42.496-19.936 71.264-59.104 85.664 39.168 16.448 59.104 44.544 59.104 85.664v134.976c0 28.8 12.352 43.84 38.464 43.84H273.6V832H220.672c-30.24 0-53.6-10.272-70.08-29.44-15.136-17.856-22.72-42.496-22.72-72.64v-128.832c0-19.872-4.096-34.24-12.352-43.2-9.6-10.944-26.784-16.416-51.52-17.792v-56.192c24.736-1.376 41.92-7.52 51.52-17.824 8.256-9.6 12.384-24 12.384-43.168V294.784c0-30.848 7.552-55.488 22.688-73.312C167.04 201.6 190.4 192 220.672 192z m529.792 0h52.896c30.24 0 53.6 9.6 70.08 29.44 15.136 17.856 22.72 42.496 22.72 73.344v128.128c0 19.2 4.096 34.24 13.024 43.84 8.96 9.6 26.112 15.776 50.848 17.152v56.192c-24.736 1.376-41.92 6.848-51.52 17.824-8.256 8.896-12.384 23.296-12.384 43.168v128.8c0 30.176-7.552 54.816-22.688 72.64-16.48 19.2-39.84 29.472-70.08 29.472h-52.896v-55.488h40.544c25.408 0 38.464-15.104 38.464-43.84v-135.04c0-41.088 19.232-69.184 59.104-85.632-39.872-14.4-59.104-43.168-59.104-85.664V292.032c0-30.144-13.056-44.544-38.464-44.544H750.4V192z" /></svg>
            </i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="application/ecmascript">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    variable: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
 .ve-field {
   white-space: nowrap;
   position: relative;
   color: var(--color-text, rgba(0, 0, 0, 0.6));
   &:after,&:before {
     content: " ";
     display: table;
   }
   &.ve-inline-field {
     display: flex;
     align-items: center;
     padding: 5px 10px;
     > .ve-field-head {
       display: inline-flex;
       background: none;
       padding: 0;
       .ve-field-title {
         display: inline-flex;
         width: 50px;
         margin-right: 5px;
         white-space: nowrap;
         text-transform: lowercase;
         .ve-word {
           font-weight: normal;
         }
       }
     }
     > .ve-field-body {
       display: inline-flex;
       width: 100%;
       align-items: center;
       padding: 0;
       margin: 0;
       position: relative;
     }
   }

   .ve-field-head {
     padding-left: 10px;
     height: 26px;
     background: var(--color-block-background-normal, #ffffff);
     display: flex;
     align-items: center;
   }
   .ve-field-title {
     font-size: 12px;
     font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Helvetica, Arial, sans-serif;
     line-height: 1.5em;
     user-select: none;
     color: var(--color-text, rgba(0, 0, 0, 0.6));
     width: fit-content;
     white-space: initial;
     word-break: break-word;
     .ve-word {
       flex: 1;
       text-align: center;
       overflow: hidden;
       &:first-child {
         text-align: left;
       }
     }
   }
   .ve-field-body {
     min-height: 20px;
     margin: 5px 5px;
     &:before, &:after {
       content: " ";
       display: table;
     }
   }
 }

</style>
