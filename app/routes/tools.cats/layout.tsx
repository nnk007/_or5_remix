export default async function Layout(props: {
    children:React.ReactNode,
    // catModal: React.ReactNode;
  }) {
    return (
      <>
        {props.children}
        {/* {props.catModal} */}
      </>
    );
  }