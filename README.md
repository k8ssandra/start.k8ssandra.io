# K8ssandra Configuration Builder

This repository configures K8ssandra yaml files with a custom UI running at [start.k8ssandra.io](https://start.k8ssandra.io).

## Using

There are helpful links and mouse-over tooltips to help guide users through the configuration experience. Additional documentation for k8ssandra and related services can be accessed at [docs.k8ssandra.io](https://docs.k8ssandra.io).

## Building 

Select a pre-set template based on your needs or configure a custom yaml from scratch. After completing the required Cluster, Topology, and Node fields, Advanced Settings may be customized to your use case. Stargate, Repair, Backup & Restore, as well as Monitoring services can be enabled and included within the output, as desired. 

## Running the App Locally

In the root directory, run `nvm use` to use the correct version of node. If prompted, it may need to be installed first. In that case, run `nvm use` again after installing. Then, run `npm install`.

To get the application up and running, run `npm run serve`.

For a production build, run `npm run build`.

## License

The [start.k8ssandra.io](https://start.k8ssandra.io) configurator is an open source tool released under the Apache 2.0 license. 