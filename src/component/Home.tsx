import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface IHomeProps extends RouteComponentProps<any> {}

export const Home = (props: IHomeProps) => {
  return <div>home</div>
}

