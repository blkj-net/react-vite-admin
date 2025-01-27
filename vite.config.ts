import reactRefresh from '@vitejs/plugin-react-refresh'
import {viteMockServe} from 'vite-plugin-mock'
import {resolve} from 'path';
import svgr from 'vite-plugin-svgr'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default ({ command } : { command: string}) => {
  console.log('command:',)
  return {
    resolve: {
      // alias: aliases,
      alias: [
        {
          // /@/xxxx  =>  src/xxx
          find: /^~/,
          replacement: pathResolve('node_modules') + '/',
        },
        {
          // /@/xxxx  =>  src/xxx
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    optimizeDeps: {
      include: [
        '@ant-design/colors',
        '@ant-design/icons',
      ],
    },
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://127.0.0.1:7770',
    //       changeOrigin: true,
    //       rewrite: path => path.replace(/^\/api/, '')
    //     }
    //   },
    // },
    plugins: [
      reactRefresh(),
      svgr(),
      viteMockServe({
        mockPath: 'mock',
        supportTs: true,
        watchFiles: true,
        localEnabled: command === 'serve',
        logger: true,
      }),
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: 'antd',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `antd/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#1890ff',
          },
        },
      },
    },
  }
}

