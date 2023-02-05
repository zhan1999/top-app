/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

module.exports = {
	reactStrictMode: true,
	compiler: {
    // Enables the styled-components SWC transform
	// to avoid warning: Prop `className` did not match. when using styled components with semantic-ui-react
		styledComponents: true
	},
	images: {
		domains: ['courses-top.ru']
	},
	webpack(config, options) {
		config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
          plugins: [{ 
            name: 'preset-default',
            params: {
              override: {
                removeViewBox: false
              }
            }
          }],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
};

