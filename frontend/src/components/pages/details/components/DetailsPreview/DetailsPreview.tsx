import { Clock } from 'components/Icons/Clock';
import { Chip } from 'components/Chip';
import { CodeBrackets } from 'components/Icons/CodeBrackets';
import { TrendingUp } from 'components/Icons/TrendingUp';
import { DetailsInformation, TrekChild } from 'modules/details/interface';
import { RemoteIconInformation } from 'components/Information/RemoteIconInformation';
import { LocalIconInformation } from 'components/Information/LocalIconInformation';
import parse from 'html-react-parser';
import { Separator } from 'components/Separator';
import { DetailsTrekFamilyCarousel } from '../DetailsTrekFamilyCarousel';
import { HtmlText } from '../../utils';

interface DetailsPreviewProps {
  ambiance?: string;
  className?: string;
  informations: DetailsInformation;
  place?: string;
  tags: string[];
  teaser?: string;
  title: string;
  trekFamily?: TrekChild[];
  id: string;
  parentId: string;
}

export const DetailsPreview: React.FC<DetailsPreviewProps> = ({
  ambiance,
  className,
  informations,
  place,
  tags,
  teaser,
  title,
  trekFamily,
  id,
  parentId,
}) => {
  // trekRank & trekRankLabel are only defined if trek is part of an itinerance
  const trekRank = trekFamily?.find(trek => trek.id === id);
  const trekRankLabel = trekRank !== undefined ? `${trekRank.rank}. ` : '';
  return (
    <div className={`${className ?? ''} flex flex-col mt-4 desktop:mt-12`}>
      {trekFamily && (
        <DetailsTrekFamilyCarousel parentId={parentId} trekChildren={trekFamily} trekId={id} />
      )}
      <span className="text-Mobile-C2 desktop:text-P1">{place}</span>
      <span className="text-primary1 text-Mobile-H1 desktop:text-H1 font-bold">{`${trekRankLabel}${title}`}</span>
      <div className="flex flex-wrap">
        {tags.map(tag => (
          <Chip className="mt-4 desktop:mt-6 mr-2 desktop:mr-4" key={tag}>
            {tag}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap">
        {informations.difficulty && (
          <RemoteIconInformation
            iconUri={informations.difficulty.pictogramUri}
            className={classNameInformation}
          >
            {informations.difficulty.label}
          </RemoteIconInformation>
        )}
        {informations.duration !== null && (
          <LocalIconInformation icon={Clock} className={classNameInformation}>
            {informations.duration}
          </LocalIconInformation>
        )}
        {informations.distance !== null && (
          <LocalIconInformation icon={CodeBrackets} className={classNameInformation}>
            {informations.distance}
          </LocalIconInformation>
        )}
        {informations.elevation !== null && (
          <LocalIconInformation icon={TrendingUp} className={classNameInformation}>
            {informations.elevation}
          </LocalIconInformation>
        )}
        {informations.courseType !== null && (
          <RemoteIconInformation
            iconUri={informations.courseType.pictogramUri}
            className={classNameInformation}
          >
            {informations.courseType.label}
          </RemoteIconInformation>
        )}
        {informations.networks.length > 0 &&
          informations.networks.map((network, i) => (
            <RemoteIconInformation
              iconUri={network.pictogramUri}
              className={classNameInformation}
              key={i}
            >
              {network.label}
            </RemoteIconInformation>
          ))}
      </div>
      {teaser !== undefined && teaser.length > 0 && (
        <div className="text-Mobile-C1 desktop:text-H4 font-bold mt-6 desktop:mt-9">
          <HtmlText>{parse(teaser)}</HtmlText>
        </div>
      )}
      {ambiance !== undefined && ambiance.length > 0 && (
        <div className="text-Mobile-C1 desktop:text-P1 mt-4 desktop:mt-8">
          <HtmlText>{parse(ambiance)}</HtmlText>
        </div>
      )}
      <Separator className="mt-6 desktop:mt-12" />
    </div>
  );
};

const classNameInformation = 'mr-3 desktop:mr-6 mt-3 desktop:mt-4 text-primary1';
