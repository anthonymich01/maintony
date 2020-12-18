import Router from "next/router"
import { Button, Icon, Segment } from "semantic-ui-react"

export const GoToSegment = ({ title, iconTitle, desc, color, actionText, link }) => {
  return (
    <Segment raised padded stacked color={color}>
      <h3>
        <Icon name={iconTitle} /> {title}
      </h3>
      <p>{desc}</p>
      <p>
        <Button color={color} icon labelPosition="right" onClick={() => Router.push(link)}>
          {actionText}
          <Icon name="arrow right" />
        </Button>
      </p>
    </Segment>
  )
}

export default GoToSegment
