import React from "react";
import { useEditor, useNode } from "@craftjs/core";
import { Affix, Alert, Anchor, AutoComplete, Avatar, BackTop, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Cascader, Checkbox, Col, Collapse, ColorPicker, ConfigProvider, DatePicker, Descriptions, Divider, Drawer, Dropdown, Empty, Flex, FloatButton, Form, Grid, Image, Input, InputNumber, Layout, List, Mentions, Menu, Modal, Pagination, Popconfirm, Popover, Progress, QRCode, Radio, Rate, Result, Row, Segmented, Select, Skeleton, Slider, Space, Spin, Statistic, Steps, Switch, Table, Tabs, Tag, TimePicker, Timeline, Tooltip, Tour, Transfer, Tree, TreeSelect, Typography, Upload, Watermark, message, notification, theme, version,} from "antd";

export const CustomTypographyComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Typography>Custom Typography</Typography>
    </div>
  );
};

export const CustomLayoutComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Layout>Custom Layout</Layout>
    </div>
  );
};

export const CustomTextComponent = ({ text }) => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  return (
    <div
      onDoubleClick={() => {
        console.log("Text component double-clicked.");
      }}
      ref={(ref) => connect(drag(ref))}
    >
      <h2>{text}</h2>
    </div>
  );
};

// CustomImage component
export const CustomImageComponent = () => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        actions.setCustom(
          query.createImage({
            src: e.target.result,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onDoubleClick={() => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = handleSelectFile;
        fileInput.click();
      }}
      ref={(ref) => connect(drag(ref))}
    >
      <img
        src="https://via.placeholder.com/150"
        alt="placeholder"
        style={{ width: "150px" }}
      />
    </div>
  );
};

// CustomButton component
export const CustomButtonComponent = () => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  return (
    <div onDoubleClick={() => console.log("Button component double-clicked.")} ref={(ref) => connect(drag(ref))}>
      <Button type="primary" size="large">
        Button
      </Button>
    </div>
  );
};

// CustomCard component
export const CustomCardComponent = () => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  return (
    <div onDoubleClick={() => console.log("Card component double-clicked.")} ref={(ref) => connect(drag(ref))}>
      <Card title="Card Title" style={{ width: 300 }}>
        <p>Card content</p>
      </Card>
    </div>
  );
};

// CustomInput component
export const CustomInputComponent = () => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  return (
    <div onDoubleClick={() => console.log("Input component double-clicked.")} ref={(ref) => connect(drag(ref))}>
      <Input placeholder="Custom Input" />
    </div>
  );
};

// CustomVideo component
export const CustomVideoComponent = () => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        actions.setCustom(
          query.createVideo({
            src: e.target.result,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onDoubleClick={() => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = handleSelectFile;
        fileInput.click();
      }}
      ref={(ref) => connect(drag(ref))}
    >
      <video controls style={{ width: "150px", height: "150px" }}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

// CustomSound component
export const CustomSoundComponent = () => {
  const { actions, query } = useEditor();
  const { connect, drag } = useNode();

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        actions.setCustom(
          query.createSound({
            src: e.target.result,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onDoubleClick={() => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = handleSelectFile;
        fileInput.click();
      }}
      ref={(ref) => connect(drag(ref))}
    >
      <audio controls style={{ width: "150px" }}>
        <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
};

// Custom components
export const CustomDatePickerComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <DatePicker>Custom DatePicker</DatePicker>
    </div>
  );
};

export const CustomDescriptionsComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Descriptions>Custom Descriptions</Descriptions>
    </div>
  );
};

export const CustomDropdownComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Dropdown>Custom Dropdown</Dropdown>
    </div>
  );
};

export const CustomEmptyComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Empty>Custom Empty</Empty>
    </div>
  );
};

export const CustomFlexComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Flex>Custom Flex</Flex>
    </div>
  );
};

export const CustomFloatButtonComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <FloatButton>Custom FloatButton</FloatButton>
    </div>
  );
};

export const CustomFormComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Form>Custom Form</Form>
    </div>
  );
};

export const CustomGridComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Grid>Custom Grid</Grid>
    </div>
  );
};


export const CustomInputNumberComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <InputNumber>Custom InputNumber</InputNumber>
    </div>
  );
};


export const CustomListComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <List>Custom List</List>
    </div>
  );
};

export const CustomMentionsComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Mentions>Custom Mentions</Mentions>
    </div>
  );
};

export const CustomMenuComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Menu>Custom Menu</Menu>
    </div>
  );
};

export const CustomModalComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Modal>Custom Modal</Modal>
    </div>
  );
};

export const CustomPaginationComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Pagination>Custom Pagination</Pagination>
    </div>
  );
};

export const CustomPopconfirmComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Popconfirm>Custom Popconfirm</Popconfirm>
    </div>
  );
};

export const CustomPopoverComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Popover>Custom Popover</Popover>
    </div>
  );
};

export const CustomProgressComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Progress>Custom Progress</Progress>
    </div>
  );
};

export const CustomQRCodeComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <QRCode>Custom QRCode</QRCode>
    </div>
  );
};

export const CustomRadioComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Radio>Custom Radio</Radio>
    </div>
  );
};

export const CustomRateComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Rate>Custom Rate</Rate>
    </div>
  );
};

export const CustomResultComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Result>Custom Result</Result>
    </div>
  );
};

export const CustomRowComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Row>Custom Row</Row>
    </div>
  );
};

export const CustomSegmentedComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Segmented>Custom Segmented</Segmented>
    </div>
  );
};

export const CustomSelectComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Select>Custom Select</Select>
    </div>
  );
};

export const CustomSkeletonComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Skeleton>Custom Skeleton</Skeleton>
    </div>
  );
};

export const CustomSliderComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Slider>Custom Slider</Slider>
    </div>
  );
};

export const CustomSpaceComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Space>Custom Space</Space>
    </div>
  );
};

export const CustomSpinComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Spin>Custom Spin</Spin>
    </div>
  );
};

export const CustomStatisticComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Statistic>Custom Statistic</Statistic>
    </div>
  );
};

export const CustomStepsComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Steps>Custom Steps</Steps>
    </div>
  );
};

export const CustomSwitchComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Switch>Custom Switch</Switch>
    </div>
  );
};

export const CustomTableComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Table>Custom Table</Table>
    </div>
  );
};

export const CustomTabsComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Tabs>Custom Tabs</Tabs>
    </div>
  );
};

export const CustomTagComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Tag>Custom Tag</Tag>
    </div>
  );
};

export const CustomTimePickerComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <TimePicker>Custom TimePicker</TimePicker>
    </div>
  );
};

export const CustomTimelineComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Timeline>Custom Timeline</Timeline>
    </div>
  );
};

export const CustomTooltipComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Tooltip>Custom Tooltip</Tooltip>
    </div>
  );
};

export const CustomTourComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Tour>Custom Tour</Tour>
    </div>
  );
};

export const CustomTransferComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Transfer>Custom Transfer</Transfer>
    </div>
  );
};

export const CustomTreeComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Tree>Custom Tree</Tree>
    </div>
  );
};

export const CustomTreeSelectComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <TreeSelect>Custom TreeSelect</TreeSelect>
    </div>
  );
};


export const CustomUploadComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Upload>Custom Upload</Upload>
    </div>
  );
};

export const CustomWatermarkComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Watermark>Custom Watermark</Watermark>
    </div>
  );
};

export const CustomMessageComponent = () => {
  return <div>Custom Message</div>;
};

export const CustomNotificationComponent = () => {
  return <div>Custom Notification</div>;
};

export const CustomThemeComponent = () => {
  return <div>Custom Theme</div>;
};

export const CustomVersionComponent = () => {
  return <div>Custom Version</div>;
};

// Custom components
export const CustomCascaderComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Cascader>Custom Cascader</Cascader>
    </div>
  );
};

export const CustomCheckboxComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Checkbox>Custom Checkbox</Checkbox>
    </div>
  );
};

export const CustomColComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Col>Custom Col</Col>
    </div>
  );
};

export const CustomCollapseComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Collapse>Custom Collapse</Collapse>
    </div>
  );
};

export const CustomColorPickerComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <ColorPicker>Custom ColorPicker</ColorPicker>
    </div>
  );
};

export const CustomConfigProviderComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <ConfigProvider>Custom ConfigProvider</ConfigProvider>
    </div>
  );
};

// ... Continue with the rest of the components

// Custom components
export const CustomBadgeComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Badge>Custom Badge</Badge>
    </div>
  );
};

export const CustomBreadcrumbComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Breadcrumb>Custom Breadcrumb</Breadcrumb>
    </div>
  );
};

export const CustomCalendarComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Calendar>Custom Calendar</Calendar>
    </div>
  );
};


export const CustomCarouselComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Carousel>Custom Carousel</Carousel>
    </div>
  );
};

// ... Continue with the rest of the components

// Custom components
export const CustomAffixComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Affix>Custom Affix</Affix>
    </div>
  );
};

export const CustomAlertComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Alert>Custom Alert</Alert>
    </div>
  );
};

export const CustomAnchorComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Anchor>Custom Anchor</Anchor>
    </div>
  );
};

export const CustomAutoCompleteComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <AutoComplete>Custom AutoComplete</AutoComplete>
    </div>
  );
};

export const CustomAvatarComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Avatar>Custom Avatar</Avatar>
    </div>
  );
};

export const CustomBackTopComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <BackTop>Custom BackTop</BackTop>
    </div>
  );
};

export const CustomDividerComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Divider>Custom BackTop</Divider>
    </div>
  );
};

// ... Rest of the components
export const CustomDrawerComponent = () => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Drawer>Custom BackTop</Drawer>
    </div>
  );
};

export const CustomContainerComponent = ({children}) => {
  const { connect, drag } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      {children}
    </div>
  );
};

// // Export list
// export CustomComponents = {
//   CustomTextComponent,
//   CustomImageComponent,
//   CustomButtonComponent,
//   CustomCardComponent,
//   CustomInputComponent,
//   CustomSoundComponent,
//   CustomVideoComponent,
//   CustomAffixComponent,
//   CustomAlertComponent,
//   CustomAnchorComponent,
//   CustomAutoCompleteComponent,
//   CustomAvatarComponent,
//   CustomBackTopComponent,
//   CustomBadgeComponent,
//   CustomBreadcrumbComponent,
//   CustomCalendarComponent,
//   CustomCarouselComponent,
//   CustomCascaderComponent,
//   CustomCheckboxComponent,
//   CustomColComponent,
//   CustomCollapseComponent,
//   CustomColorPickerComponent,
//   CustomConfigProviderComponent,
//   CustomDatePickerComponent,
//   CustomDescriptionsComponent,
//   CustomDividerComponent,
//   CustomDrawerComponent,
//   CustomDropdownComponent,
//   CustomEmptyComponent,
//   CustomFlexComponent,
//   CustomFloatButtonComponent,
//   CustomFormComponent,
//   CustomGridComponent,
//   CustomInputNumberComponent,
//   CustomLayoutComponent,
//   CustomListComponent,
//   CustomMentionsComponent,
//   CustomMenuComponent,
//   CustomModalComponent,
//   CustomPaginationComponent,
//   CustomPopconfirmComponent,
//   CustomPopoverComponent,
//   CustomProgressComponent,
//   CustomQRCodeComponent,
//   CustomRadioComponent,
//   CustomRateComponent,
//   CustomResultComponent,
//   CustomRowComponent,
//   CustomSegmentedComponent,
//   CustomSelectComponent,
//   CustomSkeletonComponent,
//   CustomSliderComponent,
//   CustomSpaceComponent,
//   CustomSpinComponent,
//   CustomStatisticComponent,
//   CustomStepsComponent,
//   CustomSwitchComponent,
//   CustomTableComponent,
//   CustomTabsComponent,
//   CustomTagComponent,
//   CustomTimePickerComponent,
//   CustomTimelineComponent,
//   CustomTooltipComponent,
//   CustomTourComponent,
//   CustomTransferComponent,
//   CustomTreeComponent,
//   CustomTreeSelectComponent,
//   CustomTypographyComponent,
//   CustomUploadComponent,
//   CustomWatermarkComponent,
//   CustomMessageComponent,
//   CustomNotificationComponent,
//   CustomThemeComponent,
//   CustomVersionComponent
// };

// export default CustomComponents;