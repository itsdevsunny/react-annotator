// @flow

import React, { memo } from "react"
import { makeStyles } from "@material-ui/core/styles"
import SidebarBoxContainer from "../SidebarBoxContainer"
import CollectionsIcon from "@material-ui/icons/Folder"
import { grey,red } from "@material-ui/core/colors"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import isEqual from "lodash/isEqual"

const useStyles = makeStyles({
  img: { width: 170, height: 40, marginLeft:30, borderRadius: 8 },
})

export const ImageSelectorSidebarBox = ({ images, onSelect,state }) => {
  const classes = useStyles()
  console.log("State: ", state);
  return (
    <SidebarBoxContainer
      title={state.jobName || 'Job Name'}
      subTitle={`(${images.length})`}
      icon={<CollectionsIcon style={{ color: red[700] }} />}
    >
      <div>
        <List>
          {images.map((img, i) => (
            <ListItem 
            button
              className={
                `imageListItem ${i == state.selectedImage ? 'active' : ''}`
              }
              onClick={() => onSelect(img, i)}
              key={i}>
              {/* <img className={classes.img} src={img.src} /> */}
              <ListItemText
                primary={img.name}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </SidebarBoxContainer>
  )
}

const mapUsedImageProps = (a) => [a.name, (a.regions || []).length, a.src]

export default memo(ImageSelectorSidebarBox, (prevProps, nextProps) =>
  isEqual(
    prevProps.images.map(mapUsedImageProps),
    nextProps.images.map(mapUsedImageProps)
  )
)
