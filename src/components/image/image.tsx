interface ImageProps {
    src: string;
}

const ImageContainer : React.FC<ImageProps> = ({src}) => {
    return (
        <div className="w-12 h-12">
            <img className="object-cover" src={src} alt=""/>
        </div>
    )
}

export default ImageContainer;