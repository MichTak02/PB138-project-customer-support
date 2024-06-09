import {useAudioFile} from "../../hooks/useAudioFile.ts";
import {Card, CardMedia, CircularProgress, Typography} from "@mui/material";

type AudioProps = {
    id: number
}

const Audio = (props: AudioProps) => {
    const { data: audioUrl, error, isLoading } = useAudioFile(props.id)

    if (isLoading) {
        return <CircularProgress />;
    }
    if (error) {
        return <Typography color="error">Error loading audio file</Typography>;
    }

    return (
        <Card>
            {audioUrl && (
                <CardMedia component="audio" controls>
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </CardMedia>
            )}
        </Card>
    );
};

export default Audio;