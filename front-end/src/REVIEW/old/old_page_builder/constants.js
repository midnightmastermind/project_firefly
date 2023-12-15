import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const DEFAULT_STYLES = {
  component: {
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: "black",
    backgroundColor: "grey",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    cursor: "move",
    height: "60px",
    width: "100%",
  },
  column: {
    flex: "1 1 100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "blue",
    backgroundColor: "grey",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    cursor: "move",
    height: "100%",
    width: "100%",
  },
  row: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "red",
    backgroundColor: "grey",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    cursor: "move",
    height: "100%",
    width: "100%",
  },
  page: {
    flex: "1 1 auto",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "green",
    backgroundColor: "grey",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundImage:
      'linear-gradient(to right, rgb(217, 226, 233) 1px, transparent 1px), linear-gradient(rgb(217, 226, 233) 1px, transparent 1px)',
    backgroundSize: "20px 20px",
  },
  hidden : {
    backgroundColor: 'unset',
    borderColor: 'unset',
    borderWidth: "0px",
    width: 'auto',
    height: 'auto',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
};

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "input",
      content: "Some input",
      object_properties: {}
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "name",
      content: "Some name",
      object_properties: {}
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "email",
      content: "Some email",
      object_properties: {}
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "phone",
      content: "Some phone",
      object_properties: {}
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "Some image",
      object_properties: {}
    }
  }
];
