# Org Chart
A University of Illinois styled Organization Chart. Displays groups in a hierarchy with customizable content displays.

## Usage
```
<div id="orgchart" data-groups=""></div>

<!-- ... -->

<script type="module">
  import { renderOrgChart } from "/path/to/orgchart/main.js";
  const headerColor = "alternating";

  const rootNode = `
    <div class="card text-center">
      <h5 class="card-header bg-orange-gradient text-white">
        Root Node
      </h5>
      <div class="card-body">
        <p class="text-center">
          <span class="fw-bold">Director:</span>
          Sam Smith
        </p>
      </div>
    </div>
  `;

  const groupNode = `
    <div class="card">
      <h5 class="card-header {bg} text-white">
        {display_name}
      </h5>
      <div class="card-body">
        <strong>Manager(s):</strong> {managers}
        <p class="mt-3 text-center">
          <a class="fw-bold" href="{link}" target="_blank">View Group Details</a>
        </p>
      </div>
    </div>
  `;

  renderOrgChart({
    groups: groupData,
    rootNode,
    groupNode,
    headerColor
  });
</script>
```

### Configuration Options

#### `groups`
This can either be directly set in the `renderOrgChart` function as a JavaScript object, or as a JSON formatted string that is added to the `data-groups` property of the containing div. If this key is omitted, the app will assume that the data is contained in the `data-groups` property.

The `groups` data should be an array of "groups". One group is required to have an `id` of `root` to be a placeholder for the top of the chart.

The structure of each group is flexible, but requires two pieces of data to work. Each group needs a key called `parentId` that matches to a group's `id` field. Besides that, the app will try to match any additional data provided to key fields in the `groupNode` definition

##### Example Group Data
```
[
  {
    id: "root",
    parentId: null
  },
  {
    id: 1,
    parentId: "root",
    display_name: "A Group",
    managers: "Alex Adams, Sam Smith",
    link: "link/to/details"
    ...
  }
]
```

#### `rootNode`
This is the node that will appear at the very top of the chart. You can alter this node to suit your needs

#### `groupNode`
This is the node template that each group will use. To show data from your `group`, you will need to add the key to your template.

#### `headerColor`
This will change the color of the header. By default it will use the Illini Blue color. Possible options are `"blue", "orange", "alternating"`. `alternating` will alternate between blue and orange, depending on the depth of the chart.