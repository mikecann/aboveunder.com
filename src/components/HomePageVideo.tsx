import * as React from "react";
import { shuffle } from '../lib/utils';
import { Embed, Grid } from "semantic-ui-react";

interface IProps {
}

interface IState {
    videos?: IYouTubeVideo[];
}

interface IYouTubeResponse {
    items: IYouTubeVideo[];
    nextPageToken?: string;
}

interface IYouTubeVideo {
    id: {
        kind: string,
        videoId: string
    },
    snippet: {
        thumbnails: {
            high: {
                url: string;
                width: number;
                height: number;
            }
        }
    }
}

export class HomePageVideo extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {

        var videos : IYouTubeVideo[] = [];
        var count = 0;
        var nextPageToken = null;

        do
        {
            count++;
            
            var url = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCrgLfQ1_Z5QQx4JKmtxkxIg&maxResults=25&key=AIzaSyAvRxFbwKI_6QuqJLFnishAfdSI2QORCqs`;
            if (nextPageToken)
                url += "&pageToken="+nextPageToken;

            var resp = await fetch(url);
            var json: IYouTubeResponse = await resp.json();
            nextPageToken = json.nextPageToken;
            console.log('Returned videos from channel', {url, json, videos, nextPageToken});
            videos = [...videos, ...json.items.filter(i => i.id.kind == "youtube#video")];
        }
        while(nextPageToken && count < 3)
       
        console.log('Got all videos', videos);
        this.setState({ videos: shuffle(videos).slice(0, 6) });
    }

    render() {
        const { videos } = this.state;

        if (videos == null)
            return "loading..";

        return <Grid stackable centered relaxed>

            <Grid.Row columns={2} stretched >
                {videos.map(v =>
                    <Grid.Column key={v.id.videoId} style={{ paddingBottom: 10 }}>
                        <Embed
                            brandedUI
                            aspectRatio="16:9"
                            placeholder={v.snippet.thumbnails.high.url}
                            id={v.id.videoId}
                            source='youtube'
                        />
                    </Grid.Column>
                )}
            </Grid.Row>

        </Grid>
    }
}
