// import * as React from "react";
// import Head from 'next/head'
// import {getDb} from "../lib/db"
// import { IPost } from "../lib/types";
// import { PostPage } from "../components/PostPage";
// import { CommonPageLayout } from "../components/CommonPageLayout";
// import { CommonLibs } from "../components/CommonLibs";

// interface IServerProps {
//   query: {
//     id: string
//   }
// }


// interface IProps {
//   post: IPost
// }


// export default class extends React.Component<IProps, any> {

//   static async getInitialProps (props: IServerProps) {
//     const post = (await getDb()).posts.find(p => p.id == props.query.id);
//     //const body = fs.readFileSync(`/posts/${post.markdownFileName}`);
//     return { post }
//   }

//   render () {
//     const {post} = this.props;
//     return (
//       <main>

//         <Head>
//           <title>Above Under - {post.title}</title>
//           <CommonLibs />
//         </Head>

//         <CommonPageLayout activeMenu="blog">
//           <PostPage post={post} />
//         </CommonPageLayout>

//       </main>
//     )
//   }
// }