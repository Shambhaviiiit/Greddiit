export default function RandomImage() {
    // const style = {
    //     width: 40%,
    //     backgroundImage: 'url(https://unsplash.it/150/200?image=${props.num})',

    // }
    // const min = 1;
    // const max = 100;
    // const num = min + Math.random() * (max - min);
    return(
        // <div style="background: "url(https://unsplash.it/150/200?image=${num})", "></div>
        <img
            //   className="img1"
              src="https://source.unsplash.com/random/200x200?sig=1"
              alt="image"
            />
        );
}