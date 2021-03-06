import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { FinderController } from './controllers/finder.controller'
import { FindDerDownloaderConsumer } from './queues/finderDowloaer.queue'
import { SaveFileQueueProcess } from './queues/saveFile.queue'
import { FinderService } from './services/finder.service'
import { QueueKeys } from './queues'
import { SaveService } from './services/save.service'
import { ConverterServiceInstance } from './services/converter.service'
import { ConverterFileProcess } from './queues/converterPdf.queue'
import { FinderFilePipe } from './queues/filter.queue'
import { MangaModule } from '../manga/manga.module'
import { ScrappingService } from './services/sracpping.service'
import { ScrappingMangasTask } from '../finder/tasks/scrapingMagas.task'

@Module({
    imports: [
        BullModule.registerQueue({
            name: QueueKeys.finderDownloader,
        }),
        BullModule.registerQueue({
            name: QueueKeys.saveFile,
        }),
        BullModule.registerQueue({
            name: QueueKeys.converterFile,
        }),
        BullModule.registerQueue({
            name: QueueKeys.pipeMangaFinder,
        }),
        MangaModule,
    ],
    providers: [
        FinderService,
        FindDerDownloaderConsumer,
        SaveFileQueueProcess,
        ConverterFileProcess,
        FinderFilePipe,
        SaveService,
        ScrappingService,
        ScrappingMangasTask,
        ConverterServiceInstance,
    ],
    controllers: [FinderController],
})
export class FinderModule {}
