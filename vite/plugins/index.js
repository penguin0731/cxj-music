import vue from '@vitejs/plugin-vue';
import createSetupExtend from './setup-extend';
import createAutoImport from './auto-import';

export default function createVitePlugins() {
  const vitePlugins = [vue()];
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createAutoImport());
  return vitePlugins;
}
